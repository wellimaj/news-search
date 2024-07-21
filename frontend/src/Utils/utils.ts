export const formatTextToHtml = (text: string) => {
  // Convert bold text
  let html = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert italic text
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Convert list items
  html = html.replace(/\*\s+(.*?)\n/g, "<li>$1</li>\n");

  // Convert key points section
  html = html.replace(/(\*\*Key Points:\*\*)/, "<h4>Key Points:</h4>\n<ul>");
  html = html.replace(/(\*\s+(.*?)\n)/g, "<li>$2</li>\n");
  html = html + "</ul>"; // Close the unordered list

  // Convert paragraphs
  html = html.replace(/\n\n+/g, "</p><p>"); // Multiple newlines to paragraphs
  html = "<p>" + html.trim() + "</p>"; // Add opening and closing paragraph tags

  // Replace newlines with breaks for single-line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
};
