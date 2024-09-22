import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid2,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Entity {
  id: number;
  title: string;
  body: string;
}

const PostsList: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);

  useEffect(() => {
    axios
      .get<Entity[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setEntities(response.data))
      .catch((error) => console.error("Error fetching entities:", error));
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Posts
      </Typography>
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
