import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid2,
  Container,
  TextField,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Entity {
  id: number;
  title: string;
  body: string;
}

const PostsList: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Delay of 300ms

    // Cleanup the timeout when the effect is about to run again
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch data based on search term
  const fetchPosts = (query: string = "") => {
    const apiURL = query
      ? `https://jsonplaceholder.typicode.com/posts?q=${query}`
      : "https://jsonplaceholder.typicode.com/posts";

    axios
      .get<Entity[]>(apiURL)
      .then((response) => setEntities(response.data))
      .catch((error) => console.error("Error fetching entities:", error));
  };

  // Effect to fetch posts based on the debounced search term
  useEffect(() => {
    fetchPosts(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Posts
      </Typography>

      {/* Search Input */}
      <Box mb={4} display="flex" justifyContent="center">
        <TextField
          label="Search Posts"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ maxWidth: 600 }}
        />
      </Box>

      <Grid2 container spacing={4}>
        {entities.map((entity) => (
          <Grid2 key={entity.id} width="20%">
            <Card>
              <CardActionArea component={Link} to={`/edit/${entity.id}`}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {entity.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {entity.body.substring(0, 100)}...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default PostsList;
