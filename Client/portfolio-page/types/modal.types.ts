import type { ReactNode } from 'react';

export interface ContextWindowProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly text?: string;
  readonly children?: ReactNode;
}