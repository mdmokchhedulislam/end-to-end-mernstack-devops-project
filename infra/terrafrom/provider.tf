terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.6.0"
    }
  }
  backend "s3" {
    bucket         = "my-linked-tf-test-bucket2" 
    key            = "data/terraform.tfstate"  
    region         = "us-east-1"                   
    encrypt        = true                          
  }


  
}

provider "aws" {
  region = "us-east-1"
}