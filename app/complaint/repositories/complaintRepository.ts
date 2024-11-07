
import type { IComplaint } from '~/app/complaint/models/Complaint';
import { useExpoferrLaravelClient } from '~/clients/ExpoferrLaravelClient';

export const useComplaintRepository = defineRepository(useExpoferrLaravelClient, (client) => {

  const url = 'complaints/';

  function getComplaint(complaint_id: string|number) {
    return client.get<IComplaint>({ url: url + complaint_id });
  };

  function confirmComplaint(complaint_id: string|number, body: object) {
    return client.post<IComplaint>({ url: url + complaint_id + '/confirm', body });
  };

  function discardComplaint(complaint_id: string|number) {
    return client.post<IComplaint>({ url: url + complaint_id + '/discard' });
  };

  function getComplaints(params: object) {
    return client.get<IComplaint[]>({ url, params });
  };

  function storeComplaint(body: object) {
    return client.post<never>({ url, body });
  };

  return {
    getComplaint,
    getComplaints,
    storeComplaint,
    confirmComplaint,
    discardComplaint
  };

});
