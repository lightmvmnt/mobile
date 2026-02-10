import {RepresentativeDetails} from '@store/representatives/representatives.types';

export interface Props {
  representative: RepresentativeDetails | null;
}

export interface ConnectedSocialAccount {
  type: 'FB' | 'TT' | 'YT' | 'LDIN';
  link: string;
}
