


module "vpc" {
  source = "./modules/vpc"
}

module "eks" {
  source = "./modules/eks"
  vpc_subnet_ids = [module.vpc.private_subnet_id, module.vpc.public_subnet_id ]
  worker_node_subnet_ids = [module.vpc.private_subnet_id]
}