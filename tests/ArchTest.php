<?php

use Symfony\Component\Finder\Finder;

arch()->preset()->php()->ignoring(['dd', 'dump']);

arch()->preset()->laravel();
arch()->preset()->relaxed();
arch()->preset()->security()->ignoring(['array_rand', 'parse_str', 'mt_rand', 'uniqid', 'sha1']);

arch('annotations')
    ->expect('App')
    ->toUseStrictEquality()
    ->toHavePropertiesDocumented()
    ->toHaveMethodsDocumented();

arch('no invalid PhpUnit test classes')
    ->expect(function () {
        $finder = Finder::create()
            ->in(['tests/Feature', 'tests/Unit'])
            ->files()
            ->name('*.php');

        $invalidFiles = [];
        foreach ($finder as $file) {
            $content = file_get_contents($file->getRealPath());
            // Only flag files that don't follow proper naming convention or structure
            if (preg_match('/class\s+\w+Test\s+extends\s+(Tests\\\\)?TestCase/', $content) && 
                !str_ends_with($file->getFilename(), 'Test.php')) {
                $invalidFiles[] = $file->getRealPath();
            }
        }

        return $invalidFiles;
    })
    ->toBeEmpty();
