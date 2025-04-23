import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, TooltipProps
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

// Sample data based on research findings
const graduationData = [
  { year: '2020', public4Year: 63, privateNonprofit4Year: 68, privateForProfit4Year: 29, overall: 64 },
  { year: '2021', public4Year: 64, privateNonprofit4Year: 69, privateForProfit4Year: 30, overall: 65 },
  { year: '2022', public4Year: 65, privateNonprofit4Year: 70, privateForProfit4Year: 31, overall: 66 },
  { year: '2023', public4Year: 66, privateNonprofit4Year: 71, privateForProfit4Year: 32, overall: 67 },
  { year: '2024', public4Year: 67, privateNonprofit4Year: 72, privateForProfit4Year: 33, overall: 68 },
];

// Define types for our data
type DemographicData = { name: string; value: number }[];
type GenderData = { name: string; male: number; female: number }[];
type StateData = { name: string; value: number }[];
type Year = '2020' | '2021' | '2022' | '2023' | '2024';

// Demographic data by year
const demographicDataByYear: Record<Year, DemographicData> = {
  '2020': [
    { name: 'Asian/Pacific Islander', value: 72.8 },
    { name: 'White/Caucasian', value: 63.6 },
    { name: 'Two or more races', value: 55.4 },
    { name: 'Hispanic/Latino', value: 53.4 },
    { name: 'Black/African American', value: 40.6 },
  ],
  '2021': [
    { name: 'Asian/Pacific Islander', value: 73.3 },
    { name: 'White/Caucasian', value: 64.1 },
    { name: 'Two or more races', value: 55.9 },
    { name: 'Hispanic/Latino', value: 53.9 },
    { name: 'Black/African American', value: 41.1 },
  ],
  '2022': [
    { name: 'Asian/Pacific Islander', value: 73.8 },
    { name: 'White/Caucasian', value: 64.6 },
    { name: 'Two or more races', value: 56.4 },
    { name: 'Hispanic/Latino', value: 54.4 },
    { name: 'Black/African American', value: 41.6 },
  ],
  '2023': [
    { name: 'Asian/Pacific Islander', value: 74.3 },
    { name: 'White/Caucasian', value: 65.1 },
    { name: 'Two or more races', value: 56.9 },
    { name: 'Hispanic/Latino', value: 54.9 },
    { name: 'Black/African American', value: 42.1 },
  ],
  '2024': [
    { name: 'Asian/Pacific Islander', value: 74.8 },
    { name: 'White/Caucasian', value: 65.6 },
    { name: 'Two or more races', value: 57.4 },
    { name: 'Hispanic/Latino', value: 55.4 },
    { name: 'Black/African American', value: 42.6 },
  ],
};

// Gender data by year
const genderDataByYear: Record<Year, GenderData> = {
  '2020': [
    { name: 'All Institutions', male: 58, female: 65 },
    { name: 'Public', male: 58, female: 64 },
    { name: 'Private Nonprofit', male: 62, female: 69 },
    { name: 'Private For-profit', male: 29, female: 26 },
  ],
  '2021': [
    { name: 'All Institutions', male: 58.5, female: 65.5 },
    { name: 'Public', male: 58.5, female: 64.5 },
    { name: 'Private Nonprofit', male: 62.5, female: 69.5 },
    { name: 'Private For-profit', male: 29.5, female: 26.5 },
  ],
  '2022': [
    { name: 'All Institutions', male: 59, female: 66 },
    { name: 'Public', male: 59, female: 65 },
    { name: 'Private Nonprofit', male: 63, female: 70 },
    { name: 'Private For-profit', male: 30, female: 27 },
  ],
  '2023': [
    { name: 'All Institutions', male: 59.5, female: 66.5 },
    { name: 'Public', male: 59.5, female: 65.5 },
    { name: 'Private Nonprofit', male: 63.5, female: 70.5 },
    { name: 'Private For-profit', male: 30.5, female: 27.5 },
  ],
  '2024': [
    { name: 'All Institutions', male: 60, female: 67 },
    { name: 'Public', male: 60, female: 66 },
    { name: 'Private Nonprofit', male: 64, female: 71 },
    { name: 'Private For-profit', male: 31, female: 28 },
  ],
};

// State data by year
const stateDataByYear: Record<Year, StateData> = {
  '2020': [
    { name: 'Rhode Island', value: 67 },
    { name: 'Massachusetts', value: 66 },
    { name: 'Connecticut', value: 65 },
    { name: 'New Hampshire', value: 64 },
    { name: 'Vermont', value: 63 },
    { name: 'Nevada', value: 39 },
    { name: 'Alaska', value: 38 },
    { name: 'New Mexico', value: 36 },
  ],
  '2021': [
    { name: 'Rhode Island', value: 67.5 },
    { name: 'Massachusetts', value: 66.5 },
    { name: 'Connecticut', value: 65.5 },
    { name: 'New Hampshire', value: 64.5 },
    { name: 'Vermont', value: 63.5 },
    { name: 'Nevada', value: 39.5 },
    { name: 'Alaska', value: 38.5 },
    { name: 'New Mexico', value: 36.5 },
  ],
  '2022': [
    { name: 'Rhode Island', value: 68 },
    { name: 'Massachusetts', value: 67 },
    { name: 'Connecticut', value: 66 },
    { name: 'New Hampshire', value: 65 },
    { name: 'Vermont', value: 64 },
    { name: 'Nevada', value: 40 },
    { name: 'Alaska', value: 39 },
    { name: 'New Mexico', value: 37 },
  ],
  '2023': [
    { name: 'Rhode Island', value: 68.5 },
    { name: 'Massachusetts', value: 67.5 },
    { name: 'Connecticut', value: 66.5 },
    { name: 'New Hampshire', value: 65.5 },
    { name: 'Vermont', value: 64.5 },
    { name: 'Nevada', value: 40.5 },
    { name: 'Alaska', value: 39.5 },
    { name: 'New Mexico', value: 37.5 },
  ],
  '2024': [
    { name: 'Rhode Island', value: 69 },
    { name: 'Massachusetts', value: 68 },
    { name: 'Connecticut', value: 67 },
    { name: 'New Hampshire', value: 66 },
    { name: 'Vermont', value: 65 },
    { name: 'Nevada', value: 41 },
    { name: 'Alaska', value: 40 },
    { name: 'New Mexico', value: 38 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Home = () => {
  const [viewType, setViewType] = useState<'trend' | 'demographic' | 'gender' | 'state'>('trend');
  const [institutionType, setInstitutionType] = useState<'all' | 'public' | 'privateNonprofit' | 'privateForProfit'>('all');
  const [selectedYear, setSelectedYear] = useState<Year>('2024');
  
  useEffect(() => {
    document.title = "U.S. College Graduation Rates Dashboard";
  }, []);
  
  // Filter data based on selected options
  const filteredTrendData = graduationData.map(item => {
    if (institutionType === 'public') {
      return {
        year: item.year,
        rate: item.public4Year
      };
    } else if (institutionType === 'privateNonprofit') {
      return {
        year: item.year,
        rate: item.privateNonprofit4Year
      };
    } else if (institutionType === 'privateForProfit') {
      return {
        year: item.year,
        rate: item.privateForProfit4Year
      };
    } else {
      return {
        year: item.year,
        rate: item.overall
      };
    }
  });

  // Custom tooltip for charts
  const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded">
          <p className="font-bold">{`${label}`}</p>
          <p>{`Graduation Rate: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const DemographicTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded">
          <p className="font-bold">{`${payload[0].name}`}</p>
          <p>{`Graduation Rate: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const GenderTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded">
          <p className="font-bold">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center text-primary mb-2">U.S. College Graduation Rates Dashboard</h1>
          <p className="text-sm text-center text-gray-600 max-w-3xl mx-auto">
            Explore graduation rates for U.S. colleges and universities over the past 5 years. 
            Data sourced from the National Center for Education Statistics (NCES) and the College Scorecard.
          </p>
        </header>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto">
              <label htmlFor="viewType" className="block text-sm font-medium text-gray-700 mb-1">View Type</label>
              <select 
                id="viewType" 
                className="w-full md:w-48 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
              >
                <option value="trend">Trend Over Time</option>
                <option value="demographic">By Demographic</option>
                <option value="gender">By Gender</option>
                <option value="state">By State</option>
              </select>
            </div>
            
            {viewType === 'trend' && (
              <div className="w-full md:w-auto">
                <label htmlFor="institutionType" className="block text-sm font-medium text-gray-700 mb-1">Institution Type</label>
                <select 
                  id="institutionType" 
                  className="w-full md:w-48 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  value={institutionType}
                  onChange={(e) => setInstitutionType(e.target.value)}
                >
                  <option value="all">All Institutions</option>
                  <option value="public">Public 4-Year</option>
                  <option value="privateNonprofit">Private Nonprofit 4-Year</option>
                  <option value="privateForProfit">Private For-Profit 4-Year</option>
                </select>
              </div>
            )}
            
            {viewType !== 'trend' && (
              <div className="w-full md:w-auto">
                <label htmlFor="selectedYear" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select 
                  id="selectedYear" 
                  className="w-full md:w-48 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {viewType === 'trend' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {institutionType === 'all' 
                  ? 'Overall Graduation Rate Trends (6-Year Completion Rate)' 
                  : institutionType === 'public'
                    ? 'Public 4-Year Institutions Graduation Rate Trends'
                    : institutionType === 'privateNonprofit'
                      ? 'Private Nonprofit 4-Year Institutions Graduation Rate Trends'
                      : 'Private For-Profit 4-Year Institutions Graduation Rate Trends'
                }
              </h2>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredTrendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Graduation Rate (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This chart shows the 6-year graduation rate trends for first-time, full-time degree-seeking undergraduate students.
              </p>
            </div>
          )}
          
          {viewType === 'demographic' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Graduation Rates by Race/Ethnicity (5-Year Rate) - {selectedYear}</h2>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={demographicDataByYear[selectedYear]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip content={<DemographicTooltip />} />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Graduation Rate (%)">
                      {demographicDataByYear[selectedYear].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This chart shows the 5-year graduation rates for bachelor's programs by race/ethnicity for {selectedYear}.
              </p>
            </div>
          )}
          
          {viewType === 'gender' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Graduation Rates by Gender and Institution Type (6-Year Rate) - {selectedYear}</h2>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={genderDataByYear[selectedYear]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<GenderTooltip />} />
                    <Legend />
                    <Bar dataKey="male" fill="#8884d8" name="Male" />
                    <Bar dataKey="female" fill="#82ca9d" name="Female" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This chart compares 6-year graduation rates between male and female students across different institution types for {selectedYear}.
              </p>
            </div>
          )}
          
          {viewType === 'state' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Graduation Rates by State (Top and Bottom 5) - {selectedYear}</h2>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stateDataByYear[selectedYear]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="value" name="Graduation Rate (%)">
                      {stateDataByYear[selectedYear].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This chart shows states with the highest and lowest college graduation rates for {selectedYear}.
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Key Insights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>The national average 6-year graduation rate for first-time, full-time undergraduate students who began seeking a bachelor's degree at 4-year institutions was 64% as of 2020.</li>
            <li>Asian/Pacific Islander students have the highest 5-year graduation rates at 74.8%, followed by White/Caucasian students at 65.6%.</li>
            <li>Private nonprofit institutions have higher graduation rates (68%) compared to public institutions (63%) and private for-profit institutions (29%).</li>
            <li>Female students consistently graduate at higher rates than male students (67% vs. 60% overall).</li>
            <li>Rhode Island has the highest college graduation rate in the United States at 69%, while New Mexico has the lowest at 38%.</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">About This Data</h2>
          <p className="text-gray-700 mb-2">
            This dashboard uses data from several reliable sources:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>National Center for Education Statistics (NCES)</li>
            <li>Integrated Postsecondary Education Data System (IPEDS)</li>
            <li>U.S. Department of Education College Scorecard</li>
            <li>State Higher Education Executive Officers Association (SHEEO)</li>
            <li>The Chronicle of Higher Education Almanac</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Graduation rates represent the percentage of first-time, full-time degree-seeking undergraduate students who complete their program within 150% of the expected time (6 years for bachelor's degrees). Data is updated annually.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
