// services/analyticsService.js
import { getAPIURL } from '@/utils/utils';
import axios from 'axios';


export const trackPageVisit = async (pageData) => {
  try {
    const ipResponse = await axios.get('https://api64.ipify.org?format=json');
    const ip= ipResponse.data.ip;

    const response = await axios.post(`${getAPIURL()}/visitors/track`, {
      userAgent: navigator.userAgent,
      ip,
      page: pageData.page || window.location.pathname,
      referrer: document.referrer || null,
    });
    return response.data;
  } catch (error) {
    console.error('Error tracking page visit:', error);
    return { success: false };
  }
};

export const getVisitorStats = async () => {
  try {
    const response = await axios.get(`${getAPIURL()}/visitors/stats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    throw error;
  }
};

export const getVisitorLogs = async (page = 1, limit = 50) => {
  try {
    const response = await axios.get(`${getAPIURL()}/visitors/logs`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching visitor logs:', error);
    throw error;
  }
};