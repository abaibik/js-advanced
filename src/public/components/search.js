const search = {
  data: () => {
    return {
      searchLine: "",
    };
  },
  props: ["search"],
  template: `<form class="d-flex">
    <input
      class="formSearch form-control me-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      v-on:input="searchLine = $event.target.value"
    />
    <button
      class="buttonSearch btn btn-outline-success"
      type="submit"
      v-on:click.stop.prevent="search(searchLine)"
    >
      Search
    </button>
  </form>`,
};

export default search;
