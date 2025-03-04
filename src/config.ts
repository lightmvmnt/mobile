import {NavItem} from './types/types';
import HomeIcon from './assets/icons/Home.svg';
import TasksIcon from './assets/icons/Tasks.svg';
import ProfileIcon from './assets/icons/userIcon.svg';
import PollsIcon from './assets/icons/pollsIcon.svg';

export const NavItems: NavItem[] = [
  {
    Icon: HomeIcon,
    to: 'Home',
    label: 'მთავარი',
  },
  {
    Icon: TasksIcon,
    to: 'Tasks',
    label: 'მისიები',
  },
  {
    Icon: PollsIcon,
    to: 'Polls',
    label: 'გამოკითხვა',
  },
  {
    Icon: ProfileIcon,
    to: 'Profile',
    label: 'პროფილი',
  },
];
