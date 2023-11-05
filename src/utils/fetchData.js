import config from '@/config/config';
import { getScreenResolution } from './globals'; // Asegúrate de que el nombre del archivo coincida
import axios from 'axios';

//HomeView
export async function fetchGitHubUserInformation() {
  try {
    const informationRequest = await axios.get(`https://api.github.com/users/${config.gh.account}`);
    return informationRequest.data;
  } catch (error) {
    console.error('Error al cargar datos desde la API', error);
    return null;
  }
}

//AboutView
export async function fetchGitHubReadme() {
  try {
    const informationRequest = await axios.get(
      `https://raw.githubusercontent.com/${config.gh.account}/${config.gh.account}/main/README.md`
    );
    return informationRequest.data;
  } catch (error) {
    console.error('Error al cargar datos desde la API', error);
    return null;
  }
}

// ProjectsView
export async function fetchUserRepositories(username, currentPage, itemsPerPage, computerScreen) {
  try {
    let url = `https://api.github.com/users/${username}/repos`;

    if (getScreenResolution() > computerScreen) {
      const page = currentPage;
      const perPage = itemsPerPage;
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;
    }

    const totalReposRequest = getScreenResolution() > 900 ? await axios.get(`https://api.github.com/users/${username}`) : null;

    const repositoriesRequest = await axios.get(url);

    return {
      user_repositories: repositoriesRequest.data,
      totalItems: totalReposRequest ? totalReposRequest.data.public_repos : 0
    };
  } catch (error) {
    console.error('Error al cargar datos desde la API', error);
    return {
      user_repositories: [],
      totalItems: 0
    };
  }
}
