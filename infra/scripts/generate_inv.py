import subprocess
import os

TERRAFORM_DIR = "infra/terraform"
OUTPUT_NAME = "bastion_publicip"
INVENTORY_PATH = "infra/ansible/inventories/prod.yml"
SSH_KEY_PATH = "secondaccount.pem"
REMOTE_USER = "ubuntu"

def get_terraform_output(output_name):
    if not os.path.exists(TERRAFORM_DIR):
        print(f"Terraform directory not found: {TERRAFORM_DIR}")
        return None

    try:
        result = subprocess.check_output(
            ["terraform", "output", "-raw", output_name],
            cwd=TERRAFORM_DIR,
            encoding="utf-8"
        ).strip()

        return result

    except subprocess.CalledProcessError:
        return None


def write_inventory(ip):
    os.makedirs(os.path.dirname(INVENTORY_PATH), exist_ok=True)

    content = f"""all:
  hosts:
    bastion:
      ansible_host: {ip}
      ansible_user: {REMOTE_USER}
      ansible_ssh_private_key_file: {SSH_KEY_PATH}
"""

    with open(INVENTORY_PATH, "w") as f:
        f.write(content)

    print(f"Inventory generated with IP: {ip}")


if __name__ == "__main__":
    ip = get_terraform_output(OUTPUT_NAME)

    if not ip:
        print("Failed to fetch terraform output")
        exit(1)

    write_inventory(ip)