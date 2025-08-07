// components/ui/dialog.tsx
'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
export function Dialog({ children, ...props }: RadixDialog.DialogProps) {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>;
}

export const DialogTrigger = RadixDialog.Trigger;

export function DialogContent({ children, }: RadixDialog.DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
    
        {children}
        <RadixDialog.Close className="absolute right-4 top-4 text-gray-500 hover:text-gray-800">
          <X className="h-5 w-5" />
        </RadixDialog.Close>
    </RadixDialog.Portal>
  );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-2 text-center sm:text-left">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold leading-none tracking-tight">{children}</h2>;
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end space-x-2 pt-4">{children}</div>;
}
