export function filterBy(tasks, filterCallback) {
    return tasks.filter(filterCallback);
  }
  
  export function containsText(data, search) {
    const clean = search.trim().toLowerCase();
    return data.toLowerCase().includes(clean);
  }