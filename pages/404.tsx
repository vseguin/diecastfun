import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "72px", sm: "120px" },
            fontWeight: 800,
            color: "text.disabled",
            opacity: 0.3,
            lineHeight: 1,
          }}
        >
          4
        </Typography>
        <Box
          sx={{
            animation: "drive 2s ease-in-out infinite",
            "@keyframes drive": {
              "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
              "25%": { transform: "translateX(-10px) rotate(-5deg)" },
              "75%": { transform: "translateX(10px) rotate(5deg)" },
            },
          }}
        >
          <DirectionsCarIcon
            sx={{
              fontSize: { xs: 72, sm: 120 },
              color: "text.disabled",
              opacity: 0.3,
            }}
          />
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "72px", sm: "120px" },
            fontWeight: 800,
            color: "text.disabled",
            opacity: 0.3,
            lineHeight: 1,
          }}
        >
          4
        </Typography>
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          marginBottom: "16px",
          color: "text.primary",
        }}
      >
        Oops! Wrong Turn
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 500,
          marginBottom: "8px",
        }}
      >
        Looks like this diecast took a detour! The page you&apos;re looking for
        doesn&apos;t exist.
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          maxWidth: 500,
          marginBottom: "32px",
        }}
      >
        Let&apos;s get you back on track.
      </Typography>

      <Link href="/" passHref legacyBehavior>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          sx={{
            textTransform: "none",
            paddingX: "32px",
            paddingY: "12px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Back to Home
        </Button>
      </Link>
    </Box>
  );
}
