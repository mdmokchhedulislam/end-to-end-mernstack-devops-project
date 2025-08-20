
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.6.0"
    }
  }
  backend "s3" {
    bucket  = "my-linked-tf-test-bucket2"
    key     = "data/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }



}

provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "../../../terraform/modules/vpc"
}

module "eks" {
  source                 = "../../../terraform/modules/eks"
  vpc_subnet_ids         = [module.vpc.private_subnet_id, module.vpc.public_subnet_id]
  worker_node_subnet_ids = [module.vpc.private_subnet_id]
}