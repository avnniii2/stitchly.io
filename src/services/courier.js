/**
 * Stitchly Courier & Dispatch Partner Service
 * Generates mock Shiprocket/Delhivery AWB tracking milestones and route telemetry.
 */

export const courierService = {
  getTrackingDetails(awb = 'DEL-ST-982144-IN') {
    return {
      awb,
      partner: 'Delhivery Surface Express',
      serviceType: 'Insured Bridal Atelier Dispatch',
      origin: 'Jaipur Master Hub (Rajasthan)',
      destination: 'Bandra West, Mumbai (Maharashtra)',
      estimatedDelivery: 'Oct 04, 2026 by 07:00 PM',
      currentStatus: 'In Transit — Inter-City Freight Hub',
      stages: [
        {
          title: 'Workshop Handoff & Security Packing',
          location: 'Pink City Atelier, Jaipur',
          time: 'Sep 23, 05:30 PM',
          completed: true,
          details: 'Placed inside breathable moisture-shield fabric garment bag with wooden hanger.'
        },
        {
          title: 'Jaipur Air Logistics Center',
          location: 'Hub Sanganer, Jaipur',
          time: 'Sep 24, 02:15 AM',
          completed: true,
          details: 'Scanned into secured high-value transit pouch.'
        },
        {
          title: 'In Transit — Western Express Corridor',
          location: 'En route to Mumbai Gateway Hub',
          time: 'Sep 24, 04:30 PM',
          completed: true,
          active: true,
          details: 'Dedicated climate-controlled container vehicle.'
        },
        {
          title: 'Out for Doorstep Delivery',
          location: 'Bandra West Distribution Center',
          time: 'Expected Oct 04, 09:30 AM',
          completed: false,
          details: 'Courier partner will call client prior to final delivery attempt.'
        },
        {
          title: 'Delivered to Client',
          location: '402, Palm Heights, Bandra West',
          time: 'Expected Oct 04, 02:00 PM',
          completed: false,
          details: 'Doorstep fit inspection kit handed over with signature.'
        }
      ]
    };
  }
};
