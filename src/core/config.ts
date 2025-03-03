import {NavItem} from '../types/types';
import HomeIcon from '../assets/images/Home.svg';
import TasksIcon from '../assets/images/Tasks.svg';
import ProfileIcon from '../assets/images/userIcon.svg';
import PollsIcon from '../assets/images/pollsIcon.svg';

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
