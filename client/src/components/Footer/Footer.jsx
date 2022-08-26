import { Typography, Box, Grid, Link, SvgIcon, Icon } from "@mui/material"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Container from '@mui/material/Container'


const Footer = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="inherit" align="center" sx={{ bgcolor: "#FFFFFF", pt: 2 }}>
        Health Tracker is not a substitute for professional medical advice. If you have any questions or concerns regards regarding your results, please consult a medical profressional.
      </Typography>
      <Container
        className="footer"
        sx={{ bgcolor: "#F3F0F0", bottom: 0, width: "100%", maxWidth: "none! important" }}
      >

        <Typography variant='inherit' align="center" sx={{ color: "default.main", fontSize: "8", fontStyle: "italic", my: 2, pt: 2, bgcolor: "#F3F0F0" }}>
          The Health Tracker team acknowledges the Traditional Owners of the land and seas and pay our respect to Elders past, present and emerging.
        </Typography>
        <Grid container justifyContent="space-evenly" sx={{ pb: 2, mt: 3, bgcolor: "#F3F0F0" }}>
          <Grid item>
            <Link
              href="#"
              target="_blank"
              style={{ textDecoration: "none" }}
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >Contact Us
            </Link>
          </Grid >
          <Grid item>
            <Link
              href="#"
              target="_blank"
              style={{ textDecoration: "none" }}
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >Privacy Policy
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="#"
              target="_blank"
              style={{ textDecoration: "none" }}
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >Terms of Use
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="#"
              target="_blank"
              style={{ textDecoration: "none" }}
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://github.com/ecomtesse"
              target="_blank"
              sx={{ mr: 1 }}
            >
              <GitHubIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/in/evan-comtesse/"
              target="_blank"
            >
              <LinkedInIcon />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer