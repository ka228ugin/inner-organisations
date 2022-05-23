export interface NavItem {
    title: string;
    url: string;
    isActive: boolean;
}
export const navItems: NavItem[] = [
    {
        title: 'Организации',
        url: './organization',
        isActive: false
    },
    {
        title: 'Участники',
        url: './person',
        isActive: false
    }
];
