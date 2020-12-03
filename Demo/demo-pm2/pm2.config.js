const os = require("os");
const pkg = require("./package.json");

const CPU_COUNT = os.cpus().length;
let argEnv = "prod";

console.log(process.env.pm_id)

const RUN_ENV_MAP = {
  test: {
    instances: 2,
    max_memory_restart: "250M",
  },
  prod: {
    instances: Math.min(Math.max(4, CPU_COUNT - 1), CPU_COUNT),
    max_memory_restart: "300M",
  },
};

module.exports = {
  apps: [
    {
      name: pkg.name,
      script: "index.js",
      instances: 3, // RUN_ENV_MAP[argEnv].instances,
      exec_mode: "cluster",
      watch: true,
      max_memory_restart: RUN_ENV_MAP[argEnv].max_memory_restart,
    },
  ],
};
