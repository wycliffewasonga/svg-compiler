import program from 'commander';
import { process } from './index';

program
    .version('0.0.1')
    .allowUnknownOption(false)
    .requiredOption('-i, --input <value>', 'input file')
    .option('-o, --output <value>', 'output file', 'out.svg')
    .option('--do-not-minimize', "Don't minimize the output", false);

export function cli(args) {
    program.exitOverride();

    try {
        program.parse(args);

        const { input, output, doNotMinimize } = program.opts();

        try {
            process(input, output, !doNotMinimize);
        } catch(ex) {
            console.log(ex.message || ex);
        }
    } catch(err) {
        program.outputHelp();
    }
}
