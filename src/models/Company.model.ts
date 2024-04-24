import bcrypt from "bcrypt";

import { CompanyProps } from "../types/Company.type";
import { User } from "./User.model";


export default class Company implements CompanyProps {
  id: string;
  name: string;
  email: string;
  contact: string;
  password: string; 
  users: User[];
  createdAt?: Date | undefined;

  constructor(props: CompanyProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.contact = props.contact;
    this.password = props.password; 
    this.users = props.users || [];
    this.createdAt = props.createdAt;
  }

  login(password: string) {
    const passwordHash = this.password;
    return bcrypt.compareSync(password, passwordHash);
  }
}