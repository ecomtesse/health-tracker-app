import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Box } from "@mui/system"
import { Typography, TextField, Button, InputAdornment, Paper, Container, Link } from '@mui/material'
import BasicTable from "./Displays/TableData"
import Chart from "./Displays/Chart"

const metricInfo = {
  weight: {
    unit: "kg",
    instructions: "Remove all items from pockets, shoes and any heavy clothing. Make sure the scales are on a flat surface. If possible use the same scales each time you weight yourself as different scales will have margins of error and be calibrated differently. Try not to weigh yourself too frequency, once per month if sufficient. Change to weight is gradual so you may not see meaningful results if you weigh yourself too frequency",
    links: {
      url: "https://www.healthdirect.gov.au/obesity#:~:text=Obesity%20is%20not%20just%20about,to%20help%20with%20weight%20loss.",
      desc: "Obesity and health effects",
    },
  },
  heart_rate: {
    unit: "bpm",
    instructions: `To check your heart rate sit down and rest for 5 minutes.     Turn your wrist so your palm is facing up. Feel for a pulse at thumb side of your wrist. Once you feel it, count how many times you feel a beat in 30 seconds. Then double it. If you cant find your pulse at your wrist, put 2 fingers on the side of your neck, next to the windpipe. If you still cant find a pulse, ask someone else to feel it for you.`,
    links: {
      url: "https://www.healthdirect.gov.au/resting-heart-rate",
      desc: "About resting heart rate and health",
    },
  }, 
  height: {
    unit: "cm",
    instructions: "You'll need a partner for this. Remove your shoes and stand up against a flat surface, such as a wall, with your feel together. Stand up straight, the corners of your eyes should be in horizontaly line with the middle of your ears. Have your partner lightly mark the wall in line with the crown of your head. A ruler or something flat can help with this. Measure the distance between the floor and mark on the wall",
    links: {
      url: "https://www.webmd.com/a-to-z-guides/ss/slideshow-height-affects-health",
      desc: "About height and health"
    },
  },
}

const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const Metric = () => {

  const { metric } = useParams()
  // console.log(metric)

  const [userMetric, setUserMetric] = useState(null)
  const [chartData, setChartData] = useState([])
  const [field, setField] = useState({ [metric]: '' })
  // console.log(chartData);


  const getMetric = async (met) => {
    const url = `/${met}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    setUserMetric(data)
    // console.log(data[met])

  }
  // Handle change and submit for new entry
  const handleChange = async (event) => {
    // console.log(event.target.value)
    setField({
      ...field,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch(`/${metric}/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(field)
    })
    // console.log(res)
    const data = await res.json()
    console.log(data)
    setUserMetric({
      [metric]: [...userMetric[metric], data]
    })
    setField({ [metric]: '' })
  }

  // Delete previous entry
  const handleDelete = async (IdToDelete) => {
    // console.log("delete entry: ", IdToDelete)
    const res = await fetch(`/${metric}/${IdToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const updateMetric = userMetric[metric].filter((m) => m.id !== IdToDelete)
    // console.log(updateMetric)
    setUserMetric({
      [metric]: updateMetric
    })
  }

  useEffect(() => {
    getMetric(metric)
  }, [])

  useEffect(() => {
    if (userMetric) {
      setChartData(getChartData(userMetric[metric], metric))
    }
  }, [userMetric])



  // Preparing the data format for the chart
  const getChartData = (data, metr) => {
    return data.map((d) => {
      return {
        label: new Date(d.date).toLocaleDateString("en-AU"),
        value: d[metr]
      }
    })
  }



  return (
    <Container component="main" align="center" sx={{ pb: 4 }} >
      <Typography variant="h4" component="h2" sx={{ mt: 2 }}>Your {capitalise(metric)}</Typography>
      {chartData && <Chart chartData={chartData} metric={metric} metricInfo={metricInfo} capitalise={capitalise} />}
      <Box className="form" align="left" sx={{ mx: 12, my: 2 }}>
        <form className="new-entry" onSubmit={handleSubmit}>
          <Typography variant="h6" component="span" sx={{ pr: 2 }}>Add A New Entry:</Typography>
          <TextField
            required
            value={field[metric]}
            onChange={handleChange}
            name={metric}
            type="number"
            id={metric}
            label={metric}
            InputProps={{
              endAdornment: <InputAdornment position="end">{metricInfo[metric].unit}</InputAdornment>
            }}
            sx={{ pr: 2 }}
            size="small"
            length="small"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ height: "80%" }}
          >
            Add Entry
          </Button>
        </form>
      </Box>
      <Box className="instructions" sx={{ mx: 12, mt: 3, mb: 4 }} align="left">
        <Typography variant="h6" >
          Instructions
        </Typography>
        <Typography>
          {metricInfo[metric].instructions}
        </Typography>
      </Box >
      <Box className="instructions" sx={{ mx: 12, mt: 3, mb: 4 }} align="left">
        <Typography variant="h6" >
          More Info
        </Typography>
        <Link
          href={metricInfo[metric].links.url}
        >
          {metricInfo[metric].links.desc}
        </Link>
      </Box >
      <Box className="entries" sx={{ mx: 12 }}>
        <Typography variant="h5" component="h3" align="left" sx={{ pb: 1 }}>Entries</Typography>
        { userMetric && <BasicTable userData={userMetric} handleDelete={handleDelete} metric={metric} metricInfo={metricInfo} capitalise={capitalise} />}
      </Box>
    </Container>
  )
}

export default Metric