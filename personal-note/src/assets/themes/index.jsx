export const theme = {
    input: {
      styles: {
        base: {
          container: {
            position: "relative",
            width: "w-full",
            minWidth: "min-w-[25px]",
            height:"h-[48px]"
          },
        },
        variants: {
          outlined: {
            base: {
              input: {
                borderWidth: "placeholder-shown:border",
                borderColor:
                  "placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200",
                floated: {
                  borderWidth: "border focus:border-2",
                  borderColor: "border-t-[1px] focus:border-t-transparent",
                },
              },
            }
          }
        }
      },
    
    },
    select: {
      styles: {
        base: {
          container: {
            position: "relative",
            width: "w-full",
            minWidth: "min-w-[90px]",
            height:"h-[48px]"
          },
        },
      },
    },
  };


export const cssInput ={
  '& label': {
    color: '#a1a1aa',
  },
  '& label.Mui-focused': {
    color: '#a1a1aa',
  },
  '& label.Mui-disabled': {
    color: '#a1a1aa',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    maxHeight: 48,
    borderRadius: 1.5,
    textAlign: 'center',
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
    '&.Mui-disabled fieldset': {
      borderColor: '#a0a0a0',
    },
  },
}