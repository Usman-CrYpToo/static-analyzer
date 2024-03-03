import main from "./main";

const basePath = process.argv.length > 2 ? (process.argv[2].endsWith("/") ? process.argv[2] : process.argv[2] + "/") : "contract/"
const scopePath = process.argv.length > 3 ? (process.argv[3].endsWith(".sol") ? process.argv[3] : process.argv[3] + ".sol") : null;
main(basePath, scopePath);