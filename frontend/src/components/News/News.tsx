import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { fetchApi } from "../../Utils/api";
import NewsList from "./newsList";

type SearchType = "title" | "description" | "container";
interface StyledBoxProps {
  firstLoad: boolean;
  theme: any;
}
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
const StyledBox = styled("div")<StyledBoxProps>(({ theme, firstLoad }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "grey",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  overflow: "hidden",
  height: "100%",
  maxHeight: !firstLoad ? "100%" : "15%",
  transition: firstLoad
    ? "max-height 1s ease-in-out"
    : "max-height 1s ease-in-out",
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 150,
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
  },
}));

const SearchComponent: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>("title");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<Number>(1);
  const [loading, setLoading] = useState(false);
  const handleSearchTypeChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSearchType(event.target.value as SearchType);
  };
  async function fetchLists() {
    setLoading(true);
    const data: any = await fetchApi(
      "protected/articles",
      "GET",
      {},
      {},
      { q: searchQuery, page: page, searchIn: searchType }
    ).then((res) => {
      setLoading(false);
      setFirstLoad(true);
      return res;
    });
    const { articles } = data.data;
    setArticles(articles || []);
  }
  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect((): any => {
    if (!searchQuery) return;
    setArticles([]);
    let timer = setTimeout(fetchLists, 300);
    return () => [clearTimeout(timer)];
  }, [searchQuery, searchType]);
  return (
    <>
      <StyledBox firstLoad={firstLoad}>
        <Typography variant="h3" gutterBottom>
          <NewspaperIcon
            style={{ height: "44px", width: "54px" }}
          ></NewspaperIcon>{" "}
          Search for articles in
        </Typography>
        <Box display="flex" alignItems="center">
          <StyledFormControl variant="outlined">
            <InputLabel id="search-type-label">Search In</InputLabel>
            <Select
              labelId="search-type-label"
              value={searchType}
              onChange={handleSearchTypeChange}
              label="Search In"
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="description">Description</MenuItem>
              <MenuItem value="container">Container</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledTextField
            variant="outlined"
            label="Search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            fullWidth
          />
        </Box>
      </StyledBox>
      {loading ? (
        <div style={{height:"100%",width:"100%", display:"flex",
          justifyContent:"center",alignItems:"center"
        }}>
          <div className="loader"></div>
        </div>
      ) : (
        <NewsList articles={articles}></NewsList>
      )}
    </>
  );
};

export default SearchComponent;
