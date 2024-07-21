interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsListProps {
  articles: Article[];
}
import React, { useState } from "react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Link,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import SummaryPopup from "./summary";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(2),
  padding: 10,
  backgroundColor: "#c03bff1f",
  border: "1px solid black",
  borderRadius: "10px",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  maxWidth: "calc(100% - 160px)",
}));

const StyledCardMedia = styled(CardMedia)({
  width: 160,
  height: 160,
  objectFit: "cover",
});

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  const [url, seturl] = useState<string>("");
  return (
    <Box
      style={{
        height: "90%",
        overflow: "auto",
      }}
    >
      {articles.map((article, index) => (
        <StyledCard key={index}>
          <StyledCardMedia image={article.urlToImage} alt={article.title} />
          <ContentBox>
            <CardContent>
              <Typography variant="h6" component="div" color="#fff">
                {article.title}
              </Typography>
              <Typography variant="body2" color="#fff">
                {article.description}
              </Typography>
              <Typography variant="body2" color="#fff">
                <strong>Source:</strong> {article.source.name}
              </Typography>
              <Typography variant="body2" color="#fff">
                <strong>Author:</strong> {article.author}
              </Typography>
              <Typography variant="body2" color="#fff">
                <strong>Published At:</strong>{" "}
                {new Date(article.publishedAt).toLocaleString()}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  seturl(article.url);
                }}
              >
                <Typography variant="body2" color="#fff">
                  <AutoFixHighIcon></AutoFixHighIcon>
                  <strong>Summarize</strong>{" "}
                </Typography>
              </Button>
            </CardContent>
            <Box mt={1}>
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </Link>
            </Box>
          </ContentBox>
        </StyledCard>
      ))}
      <SummaryPopup
        url={url}
        open={url.length > 0}
        close={() => seturl("")}
      ></SummaryPopup>
    </Box>
  );
};

export default NewsList;
