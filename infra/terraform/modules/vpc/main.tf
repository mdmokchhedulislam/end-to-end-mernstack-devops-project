resource "aws_vpc" "project_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id     = aws_vpc.project_vpc.id
  cidr_block = var.public_subnet_cidr
  map_public_ip_on_launch = true
  availability_zone = "us-east-1a"

  tags = {
    Name = "${var.project_name}-public"
    "kubernetes.io/cluster/cluster"    = "shared"
    "kubernetes.io/role/elb"           = "1"
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id     = aws_vpc.project_vpc.id
  cidr_block = var.private_subnet_cidr
  availability_zone = "us-east-1b"

  tags = {
    Name = "${var.project_name}-private"
    "kubernetes.io/cluster/cluster"    = "shared"
    "kubernetes.io/role/internal-elb" = "1"
  }
}

resource "aws_internet_gateway" "project_gateway" {
  vpc_id = aws_vpc.project_vpc.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

resource "aws_eip" "project_nati_eip" {
  domain = "vpc"

}

resource "aws_nat_gateway" "project_nat_gateway" {
  allocation_id = aws_eip.project_nati_eip.id
  subnet_id     = aws_subnet.public_subnet.id

  tags = {
    Name = "${var.project_name}-nat"
  }
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.project_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.project_gateway.id
  }

  tags = {
    Name = "${var.project_name}-public-rt"
  }
}

resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.project_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.project_nat_gateway.id
  }

  tags = {
    Name = "${var.project_name}-private-rt"
  }
}

resource "aws_route_table_association" "public_associate" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "private_associate" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private_route_table.id
}
