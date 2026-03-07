
# Pass provider explicitly to avoid orphan state issue
module "vpc" {
  source = "./modules/vpc"

}

module "eks" {
  source = "./modules/eks"


  public_subnet_id       = module.vpc.public_subnet_id_1
  vpc_id                 = module.vpc.vpc_id
  vpc_subnet_ids         = [module.vpc.private_subnet_id_1, module.vpc.private_subnet_id_2]
  worker_node_subnet_ids = [module.vpc.private_subnet_id_1, module.vpc.private_subnet_id_2]
}
