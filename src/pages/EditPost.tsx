import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Typography,
  Grid2,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const entitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  userId: z.number().positive("User is required"),
});

type EntityFormData = z.infer<typeof entitySchema>;

interface User {
  id: number;
  name: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EntityFormData>({
    resolver: zodResolver(entitySchema),
    defaultValues: { title: "", body: "", userId: undefined },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch entity data
        const postResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        );
        const { title, body, userId } = postResponse.data;
        setValue("title", title);
        setValue("body", body);
        setValue("userId", userId);

        // Fetch users for select component
        const usersResponse = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users",
        );
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data: EntityFormData) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data,
      );
      console.log("Post request successful:", response.data);
      alert("Entity updated successfully!");
      navigate("/list");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          width="100%"
        >
          Edit Post
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid2 container spacing={2} gridTemplateColumns="1fr">
            <Grid2 size={14}>
              <TextField
                label="Title"
                {...register("title")}
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid2>
            <Grid2 size={14}>
              <TextField
                label="Body"
                {...register("body")}
                fullWidth
                multiline
                rows={6}
                error={!!errors.body}
                helperText={errors.body?.message}
              />
            </Grid2>
            <Grid2 size={14}>
              <FormControl fullWidth error={!!errors.userId}>
                <InputLabel id="user-select-label">User</InputLabel>
                <Select
                  labelId="user-select-label"
                  label="User"
                  defaultValue=""
                  {...register("userId", { valueAsNumber: true })}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.userId && (
                  <Typography variant="body2" color="error">
                    {errors.userId.message}
                  </Typography>
                )}
              </FormControl>
            </Grid2>
            <Grid2 size={14} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
};

export default EditPost;
