import { Typography, Container } from "@mui/material";

const BlankPage: React.FC = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Blank page
      </Typography>
    </Container>
  );
};

export default BlankPage;
