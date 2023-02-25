import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

// Yup validation schema
const schema = yup.object({
  title: yup.string().min(3).max(20).required('Title is required'),
  description: yup.string().min(3).max(50).required('Description is required'),
  status: yup.string().required('Status is required'),
  category: yup.string().required('Category is required'),
}).required();

const TodoForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Submit logic here
  };

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>Create Todo</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Title" fullWidth margin="normal" error={!!errors.title} helperText={errors.title?.message} />}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Description" multiline rows={4} fullWidth margin="normal" error={!!errors.description} helperText={errors.description?.message} />}
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Status</FormLabel>
          <Controller
            name="status"
            control={control}
            defaultValue="todo"
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel value="done" control={<Radio />} label="Done" />
                <FormControlLabel value="todo" control={<Radio />} label="Todo" />
                <FormControlLabel value="canceled" control={<Radio />} label="Canceled" />
              </RadioGroup>
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} labelId="category-label" label="Category" error={!!errors.category}>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Create Todo
        </Button>
      </form>
    </>
  );
};

export default TodoForm;
