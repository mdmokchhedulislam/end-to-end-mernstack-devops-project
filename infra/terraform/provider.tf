terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"   # Stable LTS version (6.x Windows-এ crash করে)
    }
  }

  backend "s3" {
    bucket  = "my-linked-tf-test-bucket33"
    key     = "data/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = "us-east-1"
}
