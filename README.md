# BSDF Viewer

BSDF viewer is a web-based BSDF parser and viewer written in JavaScript. The project is
inspired by [Andy McNeil's BSDF viewer](https://www.radiance-online.org/download-install/third-party-utilities/bsdf-viewer).

The goal of the project is to address the current issues with installation and operating
system compatibility by developing a web-based viewer for BSDF files that runs in every
modern browser.

And if you are wondering what BSDF stands for. It stands for [Bidirectional Scattering Distribution Function](https://en.wikipedia.org/wiki/Bidirectional_scattering_distribution_function).
If you are dead serious to learn about BSDFs
and their use in [Radiance](https://www.radiance-online.org/) then see
[this slides](https://www.radiance-online.org/community/workshops/2019-new-york-ny/presentations/day1/20190821_BSDF_and_Matrix_Tutorial_final.pdf) from the BSDF workshop.


[![Click to open the viewer](https://user-images.githubusercontent.com/2915573/63813125-98a77000-c8fa-11e9-8c13-d0405afb43e6.png)](https://www.ladybug.tools/bsdf-viewer/)

## Roadmap

The project is a work in progress and currently does not support TensorTree BSDFs. The
parser for TensorTree files has been already implemented but there is no viewer!

The page style needs to be re-done. The webpage looks like a page designed around 1992
which surprisingly supports interactive visualization!

## Credits

The BSDF viewer is using [D3js](https://github.com/d3/) for interactive visualization.

The legend is modified from [this example](http://bl.ocks.org/syntagmatic/e8ccca52559796be775553b467593a9f).

So many thanks to:

- Greg Ward for Radiance, for answering all my stupid questions about BSDF and
  providing sample code and related documents.
- Andy McNeil for all the above except for not creating Radiance and plus his genBSDF
  tutorial.
- David Geisler-Moroder for the comprehensive BSDF workshop, providing the conversion
  factors for Klems BSDF and answering my random BSDF questions.
- Rob Guglielmetti for testing and providing feedback and answering my questions.
- Taoning Wang for testing the interface and reporting the bug with Klems parser.
- Eleanor Lee for making BSDFs look easy to understand during her presentations.
- Sarith Subramaniam for helping with the initial push to write the viewer and providing
  support for using genBSDF.
- [Let me know if you are missing from the list! Thanks.]
