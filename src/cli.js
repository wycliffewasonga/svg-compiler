import program from 'commander';
import { compile } from './index';

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
            compile(input, output, !doNotMinimize);
        } catch(ex) {
            console.error(ex.message || ex);
        }
    } catch(err) {
        program.outputHelp();
    }
}
