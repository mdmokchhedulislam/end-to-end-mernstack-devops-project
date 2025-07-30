cluster_name           = "project_eks_controller_cluster"
cluster_version        = "1.31"
controller_iam_role_name = "project_eks_cluster_role"
worker_iam_role_name   = "project_eks_node_group_role"
node_group_name       = "worker_node_group"
node_group_desired_size = 2
node_group_min_size   = 1
node_group_max_size   = 3
