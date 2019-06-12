const storage = {
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    remove(key) {
        localStorage.removeItem(key)
    },
    remove(key, index) {
        var data = this.get(key);
        data.splice(index, 1)
        this.set(key, data);
    }
};
export default storage