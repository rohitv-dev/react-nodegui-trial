// Import External Dependencies
const osu = require('node-os-utils')

// Destructure plugin modules
const {os, cpu, mem, drive} = osu
 
// Import global
import { global } from "./global"
 
// Use ASYNC function to handle promises
export const systemDetails = async () => {
    const platform = cpu.model()
    const operatingSystem = await os.oos()
    const ip = os.ip()
    const osType = os.type()
    const arch = os.arch()

    // CPU Usage
    const cpuUsed= await cpu.usage()
    const cpuFree = await cpu.free()

    // Memory Usage
    const memUsed = await mem.used()
    const memFree = await mem.free()

    // Disk Space Usage
    const memUsedPercentage = memUsed.usedMemMb / memUsed.totalMemMb * 100
    const memFreePercentage = memFree.freeMemMb / memFree.totalMemMb * 100

    const systemInformation = {
      staticDetails: {
        platform,
        operatingSystem,
        ip,
        osType,
        arch
      },
      cpuDetails: {
        cpuUsed: {
          usage: cpuUsed,
          label: global.labels.used,
          color: global.colors.red
        },
        cpuFree: {
          usage: cpuFree,
          label: global.labels.free,
          color: global.colors.green
        }
      },
      memoryDetails: {
        memUsed: {
          usage: memUsedPercentage,
          label: global.labels.used,
          color: global.colors.red
        },
        memFree: {
          usage: memFreePercentage,
          label: global.labels.free,
          color: global.colors.green
        }
      },
    }
    return systemInformation
}