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

enum StatusEnum {
  done = 'done',
  todo = 'todo',
  canceled = 'canceled'
}

type Todo = {
  title: string;
  description: string;
  status: StatusEnum;
  category: string;
}

const schema: yup.ObjectSchema<Todo> = yup.object({
  title: yup.string().min(3).max(20).required('Title is required'),
  description: yup.string().min(3).max(50).required('Description is required'),
  status: yup.mixed<StatusEnum>().oneOf(Object.values(StatusEnum)).required(),
  category: yup.string().required('Category is required'),
}).required();

const TodoForm = () => {
  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: Todo) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        // Iterate over the errors and set them on the respective fields
        if (responseData.errors) {
          Object.keys(responseData.errors).forEach((key) => {
            setError(key as keyof Todo, {
              type: "manual",
              message: responseData.errors[key]
            });
          });
        }
        throw new Error('Failed to create todo');
      }

      // Handle successful todo creation here
      alert('Todo created successfully');
      reset();
    } catch (error: any) {
      // Show a general error message or handle it as needed
      alert(error.message);
    }
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
            defaultValue={StatusEnum.todo}
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel value={StatusEnum.done} control={<Radio />} label="Done" />
                <FormControlLabel value={StatusEnum.todo} control={<Radio />} label="Todo" />
                <FormControlLabel value={StatusEnum.canceled} control={<Radio />} label="Canceled" />
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
