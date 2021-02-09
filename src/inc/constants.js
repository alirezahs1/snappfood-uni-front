let url;
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  url = 'http://127.0.0.1:8000/api';
  // url = 'http://95.216.52.140/api';
} else {
  url = 'https://.com/api';
}

export const BASE_URL = url;
export const MEDIA_UPLOAD_URL = `${BASE_URL}/admin/medias/`;
export const PAGE_SIZE = 20;
