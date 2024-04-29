import bcrypt from "bcrypt";

import { UserProps } from "../types/User.type";

export class User implements UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  permission_add: boolean;
  permission_edit: boolean;
  permission_delete: boolean;
  permission_update: boolean;
  permission_updateStatus: boolean;
  permission_deleteOrder: boolean;
  permission_add_new_worker: boolean;
  companyId: string;
  createdAt?: Date | undefined;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name =  props.name;
    this.email =  props.email;
    this.password =  props.password;
    this.permission_add =  props.permission_add || false;
    this.permission_edit =  props.permission_edit || false;
    this.permission_delete =  props.permission_delete || false;
    this.permission_update =  props.permission_update || false;
    this.permission_updateStatus =  props.permission_updateStatus || false;
    this.permission_deleteOrder =  props.permission_delete || false;
    this.permission_add_new_worker =  props.permission_add_new_worker || false;
    this.companyId =  props.companyId;
    this.createdAt =  props.createdAt;
  }

  login(password: string) {
    const passwordHash = this.password;
    return bcrypt.compareSync(password, passwordHash);
  }
}