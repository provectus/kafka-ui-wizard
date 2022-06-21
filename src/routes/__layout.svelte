<script type="ts">
  import { base } from '$app/paths';
  import ClusterList from '../components/ClusterList.svelte';
  import gitHubLogo from '$lib/GitHub-Mark-120px-plus.png';
  import '../app.css';
</script>

<div class="navbar bg-base-100 px-6 border-b">
  <div class="navbar-start">
    <a class="kui-logo flex gap-2 text-xs font-bold items-center" href={`${base}/`}>
      <svg
        width="23"
        height="30"
        viewBox="0 0 23 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.17668 0C2.17668 0 8.45218 9.02115 19.6155 13.3524C19.6155 13.3524 27.0635 7.06532 19.862 16.1041C12.6605 25.1428 1.6961 30.617 2.17668 29.9444C3.60584 27.9442 8.31948 24.1222 5.91024 21.7649C10.6395 17.1375 0 14.0868 0 14.0868C2.75705 8.06572 2.17668 0 2.17668 0Z"
          fill="#4F4FFF"
        />
      </svg>
      <span>Wizard for UI for Apache Kafka </span>
    </a>
  </div>
  <div class="navbar-end">
    <ul class="menu menu-horizontal p-0">
      <li><a href={`${base}/clusters/new`}>Add new cluster</a></li>
      <li>
        <a href="https://github.com/provectus/kafka-ui" target="_blank">
          <img src={gitHubLogo} width="24" alt="Kafka UI" />
        </a>
      </li>
    </ul>
  </div>
</div>

<main class="kui-content">
  <div class="flex justify-between w-full lg:min-h-full">
    <div class="flex flex-col lg:flex-row w-full lg:min-h-full items-start rounded bg-white shadow">
      <div
        class="w-full md:h-full lg:w-1/3 border-t lg:border-t-0 lg:border-r lg:border-l bg-gray-100"
      >
        <ClusterList />
      </div>
      <div class="w-full lg:w-2/3 p-5 min-h-full">
        <slot />
      </div>
    </div>
  </div>
</main>

<style lang="css">
  .kui-logo {
    color: rgb(20, 20, 184);
  }
  .kui-logo:hover {
    color: #363636;
  }
  .kui-content {
    height: calc(100vh - 65px);
  }
</style>
