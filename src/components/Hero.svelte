<script lang="ts">
  import { base } from '$app/paths';
</script>

<div class="hero h-96">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <a href={`${base}/clusters/new`} class="btn btn-primary btn-lg">
        Configure New Kafka Cluster
      </a>
    </div>
  </div>
</div>
