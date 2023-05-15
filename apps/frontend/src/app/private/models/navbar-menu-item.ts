export class NavbarMenuItem {
  id: string;
  name: string;
  navigation: string;
  children: Omit<NavbarMenuItem[], 'children'>;
}
