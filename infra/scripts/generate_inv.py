import subprocess
import os
import time

TERRAFORM_DIR = "../terraform"
OUTPUT_NAME = "bastion_publicip"
INVENTORY_PATH = "../ansible/inventories/prod.yml"
SSH_KEY_PATH = "/home/mokchhedul_islam/.ssh/secondaccount.pem"
REMOTE_USER = "ubuntu"

def get_terraform_output(output_name):
    if not os.path.exists(TERRAFORM_DIR):
        print(f"Error: Terraform directory not found at {TERRAFORM_DIR}")
        return None
    
    current_dir = os.getcwd()
    os.chdir(TERRAFORM_DIR)
    
    try:
        result = subprocess.check_output(
            ["terraform", "output", "-raw", output_name],
            stderr=subprocess.STDOUT,
            encoding="utf-8"
        ).strip()
        
        os.chdir(current_dir)
        
        if "Warning" in result or "No outputs" in result or not result:
            return None
        return result
    except subprocess.CalledProcessError:
        os.chdir(current_dir)
        return None

def write_inventory(ip):
    target_dir = os.path.dirname(INVENTORY_PATH)
    if not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)

  
    content = f"""all:
  hosts:
    bastion:
      ansible_host: {ip}
      ansible_user: {REMOTE_USER}
      ansible_ssh_private_key_file: {SSH_KEY_PATH}
"""
    try:
        with open(INVENTORY_PATH, "w", encoding="utf-8") as f:
            f.write(content)
        
        print("\n" + "="*40)
        print(f"SUCCESS! BASTION PUBLIC IP: {ip}")
        print("="*40)
        print(f"YAML Inventory updated: {os.path.abspath(INVENTORY_PATH)}")
    except Exception as e:
        print(f"File writing error: {e}")

if __name__ == "__main__":
    print(f"Changing directory to {TERRAFORM_DIR} and fetching IP...")
    public_ip = get_terraform_output(OUTPUT_NAME)
    
    if public_ip:
        write_inventory(public_ip)
     
    else:
        print("\nERROR: Could not fetch valid output.")
        input("\nPress Enter to exit...")