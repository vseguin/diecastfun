import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Instagram, Favorite } from "@mui/icons-material";
import { overlays, borders } from "../utils/theme";

export default function Footer() {
  return (
    <Box
      sx={{
        marginTop: "auto",
        borderTop: borders.default,
        padding: "32px",
        backgroundColor: overlays.dark,
        backdropFilter: "blur(8px)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
          }}
        >
          Built with <Favorite sx={{ fontSize: "1rem", color: "#ef4444" }} />{" "}
          using Next.js
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography component="div" sx={{ color: "text.secondary" }}>
            Find me on
          </Typography>
          <a
            href="https://www.instagram.com/164diecastfun/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              backgroundColor: overlays.light,
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = overlays.medium;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = overlays.light;
            }}
          >
            <Instagram sx={{ fontSize: "1.2rem" }} />
            <span>Instagram</span>
          </a>
        </Box>
      </Box>
    </Box>
  );
}
