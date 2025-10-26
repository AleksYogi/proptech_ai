// This is a client-side utility for making API requests
// The actual API endpoint will be created in the api/ directory for Vercel

export interface ConsentData {
  privacyPolicy: boolean;
  dataTransfer: boolean;
}

export interface LeadData {
  name: string;
  phone: string;
  company: string;
  convenientTime?: string;
  consent?: ConsentData;
}

export interface LeadResponse {
  success: boolean;
  message?: string;
  error?: string;
  errors?: string[];
}

export const submitLead = async (data: LeadData): Promise<LeadResponse> => {
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        message: 'Lead submitted successfully',
        errors: result.errors || []
      };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to submit lead' };
    }
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};