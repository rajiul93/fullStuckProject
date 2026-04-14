'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

type RhfCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
  disabled?: boolean;
};

export function RhfCheckbox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ control, name, label, description, disabled }: RhfCheckboxProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                disabled={disabled}
                checked={Boolean(field.value)}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
              />
            </FormControl>
            <FormLabel>{label}</FormLabel>
          </div>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

