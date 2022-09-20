import TextField, { TextFieldPropsSizeOverrides } from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";
import React from "react";

interface FormInputTextProps<TFieldValues extends FieldValues> {
   name: Path<TFieldValues>;
   control: Control<TFieldValues, any>;
   label: string;
   rules?: Omit<RegisterOptions<TFieldValues, FieldPath<TFieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
   disabled?: boolean;
   size?: 'small' | 'medium';
   error?: string | undefined;
   type?: string;
   readOnly?: boolean;
   maxLength?:number;
   resetImgURl?: () => void;
   defaultValue?: string;
   variant?:"outlined" | "standard" | "filled" | undefined;
   autoFocus?:boolean|undefined,
}


function ControllerTextFieldInput<TFieldValues extends FieldValues>(
   {
      name,
      control,
      label,
      rules = {},
      disabled = false,
      size = 'medium',
      error = undefined,
      type,
      readOnly,
      maxLength=15,
      variant="outlined",
      autoFocus=false,

   }: FormInputTextProps<TFieldValues>) {


   return (
      (
         <Controller
            name={name}
            control={control}
            render={({ field }) =>
               <TextField
                  label={readOnly?(label+" - not changeable*"):label}
                  disabled={disabled}
                  size={size}
                  type={type}
                  error={!!error}
                  variant={variant}
                  helperText={error || ''} placeholder={name}  
                  autoFocus={autoFocus}
                  inputProps={{ maxLength,readOnly}}
                  {...field} 
               />
            }
            rules={rules}
         />
      )
   )
}

export default ControllerTextFieldInput