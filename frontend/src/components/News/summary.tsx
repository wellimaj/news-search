import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { fetchApi } from "../../Utils/api";
import { formatTextToHtml } from "../../Utils/utils";
const SummaryPopup: React.FC = ({ url, open, close }: any) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(
        "protected/summarize",
        "GET",
        {
          /* request payload here */
        },
        {},
        { url }
      );
      setSummary(formatTextToHtml(response.data));
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Failed to fetch summary.");
    } finally {
      setLoading(false);
    }
  };

  useEffect((): any => {
    fetchSummary();
  }, [url]);
  function handleClose() {
    close();
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Summary</DialogTitle>
        <DialogContent>
          {loading ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: summary }}></div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SummaryPopup;
